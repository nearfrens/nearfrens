pragma solidity ^0.8.4;


contract WagMeetCoordinateLedger {

    // Example : [["40", "42", "51"],["74", "0", "21"]]

    struct Latitude {
        int8 _degrees;
        int8 _minutes;
        int8 _seconds;
    }

    struct Longitude {
        int16 _degrees;
        int8 _minutes;
        int8 _seconds;
    }

    struct Coordinate {
        Latitude _latitude;
        Longitude _longitude;
    }

    mapping(address => Coordinate[]) private _addressToCoordinatesMapping;

    function addCoordinate(address _sender, Coordinate memory _coordinate) public {
        _addressToCoordinatesMapping[_sender].push(_coordinate);
    }

    function getCoordinates(address _sender) public view returns (Coordinate[] memory) {
        return _addressToCoordinatesMapping[_sender];
    }

}
