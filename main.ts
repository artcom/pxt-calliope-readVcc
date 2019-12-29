/**
 * Benutzerdefinierte Blöcke
 */
//% weight=100 color= #239b56 icon="\uf2dc"
namespace sharpGP2Y1010AU0F {
    const REFERENCE_VOLTAGE = 3000; // mV
    const NODUST_VOLTAGE = 400; // mV
    const CONVERSION_RATIO = 17; // μg/m3 / mV; in percent
    const WAVESHARE_DIVIDER = 11;
    const PULSE_TIME = 320; // μs, SPEC
    const SAMPLING_TIME = 280; // μs, SPEC
    const PINREAD_TIME = 80; // μs, for calliope 
    const CYCLE_TIME = 10000; // ms, SPEC recommended
    const VLED_ON = 1;
    const VLED_OFF = 0;
    let SAMPLES = 10; // SPEC recommended
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
        let delta_time = PULSE_TIME - SAMPLING_TIME - PINREAD_TIME;
        if (delta_time < 0) {
            delta_time = 0;
        }
        let sleep_time = CYCLE_TIME - Math.max(PULSE_TIME, SAMPLING_TIME + PINREAD_TIME)
        for (let i = 0; i < SAMPLES; i++) {
            // LED on
            pins.digitalWritePin(VLED, VLED_ON);
            control.waitMicros(SAMPLING_TIME);
            voltage = pins.analogReadPin(VO);
            control.waitMicros(delta_time);
            pins.digitalWritePin(VLED, VLED_OFF);
            control.waitMicros(sleep_time);
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
        dust = CONVERSION_RATIO * (getSensorRAWValue() * WAVESHARE_DIVIDER - NODUST_VOLTAGE) / 100;
        if (dust < 0) {
            dust = 0
        }
        return dust;
    }
}
