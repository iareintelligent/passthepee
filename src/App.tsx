import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {
    Container,
    Typography,
    Card,
    CardActionArea, CardMedia, CardContent, Box, Tooltip, IconButton
} from "@mui/material";
import {useTranslation} from "react-i18next";
import SmokeyPee from "./static/images/smokey-pee.jpg";
import ThcIntakeValues, {ThcIntakeFormData} from "./components/Forms/ThcIntakeValues";
import {
    adjustHalfLife,
    calculateThcIntake, estimateHalfLife, simulateThcClearance,
} from "./hooks/useHerbalKnowledge";
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import {HelpOutline} from "@mui/icons-material";
import EstimateHalfLifeValues, {HalfLifeFormData} from "./components/Forms/EstimateHalfLifeValues";
import AdjustHalfLifeValues, {AdjustHalfLifeFormData} from "./components/Forms/AdjustHalfLife";

export interface CombinedFormData extends ThcIntakeFormData, HalfLifeFormData, AdjustHalfLifeFormData {}


function App() {
    const { register, handleSubmit } = useForm<Partial<CombinedFormData>>();

    const { t } = useTranslation();

    const [onboardThcInMg, setOnboardThcInMg] = useState<number>(0);
    const [estimatedHalfLife, setEstimatedHalfLife] = useState<number>(0);
    const [adjustedHalfLife, setAdjustedHalfLife] = useState<number>(0);
    const [clearanceTime, setClearanceTime] = useState<number>(0);

    const [halfLife, setHalfLife] = useState<number>(0);


    const [navValue, setNavValue] = useState("intake");
    const [inputDetected, setInputDetected] = useState(false);

    const calculateClearanceDate = (daysToAdd: number): Date => {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date;
    };

    const clearanceDate = useMemo(() => {
        if (!clearanceTime) {
            return new Date();  // Default to today if clearanceTime is not set.
        }
        return calculateClearanceDate(clearanceTime);
    }, [clearanceTime]);


    const onSubmit = (data: Partial<CombinedFormData>) => {
        const { joints, looseHerb, vapingSessions, edibles, yearsOfUsage, frequency, hrsDailyExercise, weight } = data;

        // Handle THC Intake
        setOnboardThcInMg(calculateThcIntake(joints, looseHerb, vapingSessions, edibles, yearsOfUsage));
        let estimatedValue = 0;
        // Handle Half Life Estimate
        if (frequency && yearsOfUsage) {
            estimatedValue = estimateHalfLife(frequency, yearsOfUsage);
            setEstimatedHalfLife(estimatedValue);
            setHalfLife(estimatedValue);
        }

        if (estimatedValue && hrsDailyExercise && weight) {
            // Handle Half Life Adjustments
            const adjustedValue = adjustHalfLife(estimatedValue, hrsDailyExercise, weight);
            setAdjustedHalfLife(adjustedValue);
            setHalfLife(adjustedValue);

            setInputDetected(true);
        }
    };

    const calculateClearanceTime = () => {
        const clearance = simulateThcClearance(onboardThcInMg, adjustedHalfLife);
        setClearanceTime(clearance);
    };

    useEffect(() => {
        calculateClearanceTime();
    }, [onboardThcInMg, adjustedHalfLife]);


    return (
        <Router>
            <Container style={{ paddingBottom: "56px" }}>
                <Card style={{ marginBottom: "3rem"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="275px"
                            src={SmokeyPee}
                            alt="a series of suggestive images of smoke and whiskey that kind of suggests pee that makes smoking seem cool that I stole from the internet somewhere."
                        >
                        </CardMedia>
                    </CardActionArea>
                    <CardContent>
                        <Typography width="100%" variant="h4" gutterBottom component="div">
                            {t("welcomeTitle")}
                        </Typography>
                        {
                            inputDetected ?
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {clearanceDate.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" })}
                                    </Typography>
                                    <Tooltip title={t("welcomeDescription")}>
                                        <IconButton>
                                            <HelpOutline />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                :
                                <Typography variant="body2" color="text.secondary">
                                    {t("welcomeDescription")}
                                </Typography>
                        }

                    </CardContent>
                </Card>
                <Switch>
                    <Redirect from="/" to="/intake" exact />
                    <Route path="/intake">
                        <Box display={"flex"} alignItems={"baseline"}>
                            <Typography variant="h2">{onboardThcInMg}mg</Typography>
                            <Typography variant="body2"> of THC to process</Typography>
                        </Box>
                        <ThcIntakeValues onSubmit={handleSubmit(onSubmit)}
                            register={register}
                        />
                    </Route>
                    <Route path="/estimate-half-life">
                        <Typography variant="h2">{estimatedHalfLife} days</Typography>
                        <EstimateHalfLifeValues onSubmit={handleSubmit(onSubmit)} register={register} />
                    </Route>

                    <Route path="/adjust-half-life">
                        <Typography variant="h2">{adjustedHalfLife.toFixed(2)} days adjusted</Typography>
                        <Typography
                            variant="h6"
                        >
                            Estimated Half-Life: {halfLife} days
                        </Typography>
                        <AdjustHalfLifeValues halfLifeDefault={halfLife} onSubmit={handleSubmit(onSubmit)} register={register} />
                    </Route>
                    <Route path="/estimate-clearance-time">
                        <Typography variant="h2">{clearanceTime.toFixed(2)} days to clear</Typography>
                    </Route>
                </Switch>
                <BottomNavBar
                    value={navValue}
                    onChange={(e, newValue) => setNavValue(newValue)}
                />
            </Container>
        </Router>
    );
}

export default App;
