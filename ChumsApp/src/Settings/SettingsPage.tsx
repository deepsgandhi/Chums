import React from 'react';
import { UserHelper, BigLinkButton, RoleAction, RoleContentType } from './Components';
import { Row } from 'react-bootstrap';

export const SettingsPage = () => {
    const getLinks = () => {
        var result = [];
        if (UserHelper.checkAccess('Admin', 'Import')) result.push(<BigLinkButton key={result.length-2} href="/settings/import" icon="fas fa-upload" text="Import Data" />);
        if (UserHelper.checkAccess('Admin', 'Import')) result.push(<BigLinkButton key={result.length-1} href="/settings/export" icon="fas fa-download" text="Export Data" />);
        if (UserHelper.checkAccess('Roles', 'View')) result.push(<BigLinkButton key={result.length} href="/settings/roles" icon="fas fa-lock" text="Manage Permissions" />);
        if (UserHelper.checkAccess(RoleContentType.ADMIN, RoleAction.EDIT_SETTINGS)) result.push(<BigLinkButton key={result.length - 3} href="/settings/church" icon="fas fa-church" text="Church Settings" />);
        return result;
    }

    return (
        <>
            <h1><i className="fas fa-cog"></i> Settings</h1>
            <Row  className="justify-content-md-center" id="settingsBoxes">
                {getLinks()}
            </Row>
        </>
    );
}

