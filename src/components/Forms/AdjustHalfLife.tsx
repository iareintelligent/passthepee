import React from "react";
import { UseFormRegister } from "react-hook-form";
import {TextField} from "@mui/material";
import {CombinedFormData} from "../../App";

export type AdjustHalfLifeFormData = {
    halfLife: number;
    hrsDailyExercise: number;
    weight: number;
};

interface AdjustHalfLifeValuesProps {
    halfLifeDefault: number;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<Partial<CombinedFormData>>;
}

export default function AdjustHalfLifeValues(props: AdjustHalfLifeValuesProps) {
    return (
        <form onChange={props.onSubmit}>
            <TextField
                defaultValue={props.halfLifeDefault}
                autoComplete="off"
                disabled
                type="number"
                label="Half Life (prev step)"
                inputProps={{ min: 0 }}
                {...props.register("halfLife")}
            />
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Hours of daily exercise"
                inputProps={{ min: 0, max: 24 }}
                {...props.register("hrsDailyExercise")}
            />
            <TextField
                defaultValue={70}
                autoComplete="off"
                type="number"
                label="Weight (lbs)"
                inputProps={{ min: 0 }}
                {...props.register("weight")}
            />
        </form>
    );
}
