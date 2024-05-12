import s from "../../styles/Profile.module.scss";
import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import ProfileContent from "../../features/user/ProfileContent";
import MyMoviesList from "../../features/user/MyMoviesList";

export default function Profile() {
    const [tabIndex, setTabIndex] = useState(0);

    function handleTabChange(_e: React.SyntheticEvent, newValue: number) {
        setTabIndex(newValue);
    }

    return (
        <div className={s["profile-container"]}>
            <div className={s.tabs}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                >
                    <Tab label="Settings" />
                    <Tab label="My Movies" />
                </Tabs>
            </div>
            <ProfileContent
                tabIndex={tabIndex}
                tabValue={0}
            />
            <MyMoviesList
                tabIndex={tabIndex}
                tabValue={1}
            />
        </div>
    );
}
