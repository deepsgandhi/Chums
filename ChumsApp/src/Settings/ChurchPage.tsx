import React from "react";
import {
  ApiHelper,
  UserHelper,
  RoleAction,
  RoleContentType,
  DisplayBox,
  ChurchSettingInterface
} from "./Components";
import { Row, Col } from "react-bootstrap";

enum SettingType {
  ALLOW_GUEST_CHECKIN = "Allow guest checkin"
}

enum boolValues {
  TRUE = 'true',
  FALSE = 'false'
}

export const ChurchPage: React.FC = () => {
  const [settings, setSettings] = React.useState<ChurchSettingInterface[]>(null);
  const [guestCheckin, setGuestCheckin] = React.useState<boolean>(false);

  const loadData = () => {
    try {
      ApiHelper.apiGet("/churchsettings").then((data: ChurchSettingInterface[]) => {
        setSettings(data);
        const allowCheckIn: ChurchSettingInterface[] = findAllowCheckIn(data);
        if (allowCheckIn.length > 0) {
          if (allowCheckIn[0].value === boolValues.TRUE) {
            setGuestCheckin(true);
          } else {
            setGuestCheckin(false);
          }
        }
      });
    } catch (err) {
      console.log('Error in fetching church settings: ', err)
    }
  };

  const findAllowCheckIn = (settings: ChurchSettingInterface[]) : ChurchSettingInterface[] => {
    const result: ChurchSettingInterface[] = [];
    settings.forEach(e => {
      if (e.keyName === SettingType.ALLOW_GUEST_CHECKIN) {
        result.push(e)
      }
    })

    return result;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowCheckIn = findAllowCheckIn(settings);
    const id = allowCheckIn[0]?.id || null;
    const churchSetting: ChurchSettingInterface = {
      id, 
      keyName: SettingType.ALLOW_GUEST_CHECKIN, 
      value: JSON.stringify(e.currentTarget.checked) 
    };
    try {
      ApiHelper.apiPost("/churchsettings", [churchSetting]).then(() => {
        setGuestCheckin(!guestCheckin);
      });  
    } catch (err) {
      console.log("Error in updating setting: ", err)
    }
  };

  React.useEffect(loadData, []);

  if (!UserHelper.checkAccess(RoleContentType.ADMIN, RoleAction.EDIT_SETTINGS)) {
    return <></>;
  }
  return (
    <>
      <h1>
        <i className="fas fa-church"></i> Church Settings
      </h1>
      <Row>
        <Col lg={8}>
          <DisplayBox headerText="Edit Church Settings" headerIcon="fas fa-cog">
            <Row>
              <Col>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={guestCheckin}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Allow self checkin of guests</label>
                </div>
              </Col>
            </Row>
          </DisplayBox>
        </Col>
      </Row>
    </>
  );
};
