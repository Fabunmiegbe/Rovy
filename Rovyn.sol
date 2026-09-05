// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Rovyn
/// @notice Waypoint NFT collection on Robinhood Chain (chain ID 4663).
/// @dev Standard ERC721Enumerable. Config values below are the only things
///      you need to touch before deploying — see README.md.
contract Rovyn is ERC721Enumerable, Ownable, ReentrancyGuard {
    // ---- Collection configuration -----------------------------------
    uint256 public constant MAX_SUPPLY = 5555;
    uint256 public constant MAX_PER_WALLET = 5;
    uint256 public mintPrice = 0.01 ether;
    uint256 public reservedForOwner = 100; // team/community reserve, minted separately

    // ---- Mint state ----------------------------------------------------
    bool public mintOpen = false;
    string private _baseTokenURI;
    string public unrevealedURI;
    bool public revealed = false;

    uint256 private _ownerMinted;
    mapping(address => uint256) public mintedBy;

    event MintOpened();
    event MintClosed();
    event Revealed(string baseURI);
    event Withdraw(address indexed to, uint256 amount);

    constructor(
        string memory unrevealedURI_,
        address initialOwner
    ) ERC721("Rovyn", "ROVYN") Ownable(initialOwner) {
        unrevealedURI = unrevealedURI_;
    }

    // ---- Public mint -----------------------------------------------------

    function mint(uint256 quantity) external payable nonReentrant {
        require(mintOpen, "Mint is not open");
        require(quantity > 0, "Quantity must be > 0");
        require(
            totalSupply() + quantity <= MAX_SUPPLY - (reservedForOwner - _ownerMinted),
            "Would exceed available supply"
        );
        require(
            mintedBy[msg.sender] + quantity <= MAX_PER_WALLET,
            "Exceeds per-wallet limit"
        );
        require(msg.value == mintPrice * quantity, "Incorrect ETH sent");

        mintedBy[msg.sender] += quantity;
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, totalSupply() + 1);
        }
    }

    // ---- Owner controls --------------------------------------------------

    function ownerMint(address to, uint256 quantity) external onlyOwner {
        require(_ownerMinted + quantity <= reservedForOwner, "Exceeds reserve");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Exceeds max supply");
        _ownerMinted += quantity;
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, totalSupply() + 1);
        }
    }

    function setMintOpen(bool open) external onlyOwner {
        mintOpen = open;
        if (open) emit MintOpened();
        else emit MintClosed();
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        _baseTokenURI = baseURI_;
        revealed = true;
        emit Revealed(baseURI_);
    }

    function setUnrevealedURI(string calldata uri_) external onlyOwner {
        unrevealedURI = uri_;
    }

    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "Nothing to withdraw");
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Withdraw failed");
        emit Withdraw(owner(), balance);
    }

    // ---- Views -------------------------------------------------------

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        if (!revealed) {
            return unrevealedURI;
        }
        return string(abi.encodePacked(_baseURI(), _toString(tokenId), ".json"));
    }

    function remainingPublicSupply() external view returns (uint256) {
        return MAX_SUPPLY - (reservedForOwner - _ownerMinted) - totalSupply();
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
