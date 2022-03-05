import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { ButtonType } from '../../enum/enums'

const Toggle = (props: any) => {
    return (
        <div className="App">
        <h1>Toggle!</h1>
            <button onClick={() => props.updateLocationFetchRequest(ButtonType.Community)}>Community</button>
            <button onClick={() => props.updateLocationFetchRequest(ButtonType.Government)}>Government</button>
            <button onClick={() => props.updateLocationFetchRequest(ButtonType.Research)}>Research</button>
        </div>
    );
}

export default Toggle;
