import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './style.css';
import { AppContext } from './contexts/AppContext';
import { Div } from './components/Div';

function Component_useContextOrganized() {
    return (
        <AppContext>
            <Div />
        </AppContext>
    );
}

export default Component_useContextOrganized;
