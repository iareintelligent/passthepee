export const calculateThcIntake = (joints: number = 0, loose_herb: number = 0, vaping_sessions: number = 0, edibles: number = 0, years_of_usage: number = 0): number => {
    const daily_thc = (joints * 20) + (loose_herb * 100) + (vaping_sessions * 10) + (edibles * 10);
    const long_term_storage = daily_thc * 365 * years_of_usage * 0.01;
    // in mg
    return daily_thc + long_term_storage;
};

export const adjustHalfLife = (halfLife: number, hrsDailyExercise: number, weight: number) => {
    const exerciseAdjustment = 1 - (0.1 * Math.log(hrsDailyExercise + 1));
    const weightAdjustment = 1 + (0.01 * Math.sqrt(weight - 70));
    return halfLife * exerciseAdjustment * weightAdjustment;
};

export const estimateHalfLife = (frequency: number, years_of_usage: number): number => {
    if (frequency <= 3) {
        return 1.3;
    } else if (frequency <= 7) { // Assuming daily use is the max frequency
        // Linear interpolation between 3 and 7 days of the week
        return 1.3 + (frequency - 3) * (7 - 1.3) / (7 - 3);
    } else {
        const base_half_life = 7;
        const long_term_adjustment = Math.log(years_of_usage + 1);
        return base_half_life + long_term_adjustment;
    }
};


interface CompartmentState {
    bloodThc: number;  // Concentration of THC in the bloodstream.
    fatThc: number;    // Amount of THC stored in fat.
}

const FAT_RELEASE_RATE = 0.05;  // Represents the percentage of THC released from fat to blood per day.

export const simulateThcClearance = (initialThc: number, halfLife: number): number => {
    const bloodEliminationRate = Math.LN2 / halfLife;  // ln(2)/halfLife
    let days_to_clear = 0;

    const initialState: CompartmentState = {
        bloodThc: initialThc * 0.8, // Assuming 50% goes immediately to the bloodstream.
        fatThc: initialThc * 0.2    // Assuming 50% is stored in fat cells.
    };

    const currentState = { ...initialState };

    const detectionThreshold = 0.5;

    while (currentState.bloodThc > detectionThreshold) {
        // Transfer from fat to blood.
        const releasedFromFat = currentState.fatThc * FAT_RELEASE_RATE;
        currentState.fatThc -= releasedFromFat;
        currentState.bloodThc += releasedFromFat;

        // Eliminate from blood.
        currentState.bloodThc *= (1 - bloodEliminationRate);

        days_to_clear++;
    }

    return days_to_clear;
};
