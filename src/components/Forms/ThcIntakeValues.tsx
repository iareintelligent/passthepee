import React from "react";
import {UseFormRegister} from "react-hook-form";
import { TextField } from "@mui/material";
import {CombinedFormData} from "../../App";


export type ThcIntakeFormData = {
    joints: number;
    looseHerb: number;
    vapingSessions: number;
    edibles: number;
    yearsOfUsage: number;
};


interface ThcIntakeValuesProps {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<Partial<CombinedFormData>>;
}

export default function ThcIntakeValues(props: ThcIntakeValuesProps) {
    return (
        <form onChange={props.onSubmit}>
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Joints per day"
                inputProps={{ min: 0 }}
                {...props.register("joints")}
            />
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Loose herb (grams) per day"
                inputProps={{ min: 0 }}
                {...props.register("looseHerb")}
            />
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Vaping sessions per day"
                inputProps={{ min: 0 }}
                {...props.register("vapingSessions")}
            />
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Edibles per day"
                inputProps={{ min: 0 }}
                {...props.register("edibles")}
            />
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Years of usage"
                inputProps={{ min: 0 }}
                {...props.register("yearsOfUsage")}
            />
        </form>
    );
}
