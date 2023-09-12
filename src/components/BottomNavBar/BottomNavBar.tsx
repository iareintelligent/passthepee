// components/BottomNavBar.tsx
import React from "react";
import { BottomNavigation, BottomNavigationAction, AppBar } from "@mui/material";
import {Timer, Edit, TimerOff, SmokingRooms} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface BottomNavBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<unknown>, newValue: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ value, onChange }) => {
    const { t } = useTranslation();

    return (
        <AppBar position="fixed" style={{top: "auto", bottom: 0}}>
            <BottomNavigation
                value={value}
                onChange={onChange}
                showLabels
            >
                <BottomNavigationAction
                    component={Link}
                    to="/intake"
                    label={t("Intake")}
                    value="intake"
                    icon={<SmokingRooms />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/estimate-half-life"
                    label={t("Estimate Half Life")}
                    value="estimate-half-life"
                    icon={<Timer />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/adjust-half-life"
                    label={t("Adjust Half Life")}
                    value="adjust-half-life"
                    icon={<Edit />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/estimate-clearance-time"
                    label={t("Clearance Time")}
                    value="estimate-clearance-time"
                    icon={<TimerOff />}
                />
            </BottomNavigation>
        </AppBar>
    );
};

export default BottomNavBar;
