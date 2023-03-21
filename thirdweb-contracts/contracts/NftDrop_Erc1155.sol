// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155Drop.sol";
import "@thirdweb-dev/contracts/extension/Permissions.sol";

contract NftDrop_Erc1155 is ERC1155Drop, Permissions {
    mapping(uint256 => string) public notes;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient
    )
        ERC1155Drop(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps,
            _primarySaleRecipient
        )
    {}

    function writeNote(
        uint256 _tokenId,
        string memory _msg
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        //require(msg.sender == ownerOf(_tokenId), "");
        notes[_tokenId] = _msg;
    }
}
//
