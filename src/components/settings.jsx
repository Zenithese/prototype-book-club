import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

function Settings({ settings, toggle }) {
    

    return (
        <div className={settings ? toggle ? "" : "settings-button-opened" : toggle ? "settings-button-closed-for-toggle" : "settings-button"} onClick={() => { setSettings(!settings); if (toggle && !settings) { setToggle(!toggle) } }}><FontAwesomeIcon icon={faCog} /></div>
    )
}