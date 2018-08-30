pragma solidity ^0.4.18;

contract Utils{
	function addressToBytes(address x) internal pure returns (bytes) {
        bytes memory buffer = new bytes(20);
        for (uint i = 0; i < 20; i++)
            buffer[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return buffer;
    }
    function uintToBytes(uint v) internal pure returns (bytes) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        return s;
    }
    function bytesConCat(bytes a, bytes b, bytes c, bytes d) internal pure returns(bytes){
    	bytes memory buffer = new bytes(a.length + b.length + c.length + d.length);
    	uint index = 0;
    	for(uint i=0;i<a.length;i++)
    		buffer[index++] = a[i];
    	for(i=0;i<b.length;i++)
    		buffer[index++] = b[i];
    	for(i=0;i<c.length;i++)
    		buffer[index++] = c[i];
    	for(i=0;i<d.length;i++)
    		buffer[index++] = d[i];
    	return buffer;
    }
    function stringCompare(string a, string b) internal pure returns(bool){
    	bytes memory ba = bytes(a);
    	bytes memory bb = bytes(b);
    	if (ba.length != bb.length)
    		return false;
    	for(uint i=0;i<ba.length;i++)
    		if (ba[i] != bb[i])
    			return false;
    	return true;
    }
}