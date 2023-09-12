import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";
import {CombinedFormData} from "../../App";

export type HalfLifeFormData = {
    frequency: number;
    yearsOfUsage: number;
};

interface EstimateHalfLifeValuesProps {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<Partial<CombinedFormData>>;
}

export default function EstimateHalfLifeValues(props: EstimateHalfLifeValuesProps) {
    return (
        <form onChange={props.onSubmit}>
            <TextField
                defaultValue={0}
                autoComplete="off"
                type="number"
                label="Frequency of intake per week"
                inputProps={{ min: 0 }}
                {...props.register("frequency")}
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
