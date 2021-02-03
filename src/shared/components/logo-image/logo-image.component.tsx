import React from 'react';
import {Image} from 'react-native';

const LogoImage: React.FunctionComponent = () => (
    <Image
        style={{width: 107.5, height: 31}}
        source={require('../../../assets/img/logo.jpg')}
    />
);

export default LogoImage;
