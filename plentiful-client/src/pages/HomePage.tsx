import React from 'react';
import Auth from '../components/Auth';

interface Props {
    type: string
}

const HomePage = (props: Props) => {
    const { type } = props;

    return (
        <Auth type={type} />
    );
}

export default HomePage;
