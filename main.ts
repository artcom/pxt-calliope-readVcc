/**
 * Benutzerdefinierte Blöcke
 */
//% weight=100 color= #239b56 icon="\uf863"
namespace sharpGP2Y1010AU0F {
    const REFERENCE_VOLTAGE = 3000.0; // mV
    const NODUST_VOLTAGE = 400.0; // mV
    const CONVERSION_RATIO = 0.17; // ug/m3 / mV
    const WAVESHARE_DIVIDER = 11;
    const PULSE_TIME = 320; // us, SPEC
    const SAMPLING_TIME = 280; // us, SPEC
    const DELTA_TIME = 40; // us, PULSE_TIME - SAMPLING_TIME, valid for analogReadPin with ZERO runtime
    const CYCLE_TIME = 10000; // ms, SPEC 
    const SLEEP_TIME = 9680; // ms, SPEC: pulse cycle 10 ms (CYCLE_TIME - PULSE_TIME)     
    const VLED_ON = 1;
    const VLED_OFF = 0;
    let SAMPLES = 10;
    let VLED = 0; // digital out PIN
    let VO = 0; // analog in PIN

    /**
         * get dust value (μg/m³) 
         * @param vLED describe parameter here, eg: DigitalPin.P16 (microbit), DigitalPin.P3 (calliope)
         * @param vo describe parameter here, eg: AnalogPin.P1 (microbit), AnalogPin.P2 (calliope)
    */
    //% block
    export function initDustSensor(vled: DigitalPin, vo: AnalogPin, samples?: number) {
        VLED = vled;
        VO = vo;
        if (samples) {
            SAMPLES = samples;
        }
    }

    //% block
    export function getSensorRAWValue(): number {
        let voltage = 0.0;
        let sum_voltage = 0.0;
        if ((VLED == 0) || (VO == 0)) {
            return 0
        }
        for (let i = 0; i < SAMPLES; i++) {
            // LED on
            pins.digitalWritePin(VLED, VLED_ON);
            control.waitMicros(SAMPLING_TIME);
            voltage = pins.analogReadPin(VO);
            control.waitMicros(DELTA_TIME);
            pins.digitalWritePin(VLED, VLED_OFF);
            control.waitMicros(SLEEP_TIME);
            voltage = pins.map(
                voltage,
                0,
                1023,
                0,
                REFERENCE_VOLTAGE
            );
            sum_voltage += voltage;
        }
        voltage = sum_voltage / SAMPLES; // mV
        return voltage;
    }

    //% block
    export function getDustValue(): number {
        let dust = 0.0;
        dust = CONVERSION_RATIO * (getSensorRAWValue() * WAVESHARE_DIVIDER - NODUST_VOLTAGE);
        if (dust < 0) {
            dust = 0
        }
        return Math.round(dust)
    }
}
