/**
 * Benutzerdefinierte Blöcke
 */
//% weight=100 color=#0fbc11 icon=""
namespace sharpGP2Y1010AU0F {
    const REFERENCE_VOLTAGE = 3; // V
    const NODUST_VOLTAGE = 0.4;
    const WAVESHARE_DIVIDER = 11;
    const SAMPLES = 10;
    const PULSE_TIME = 320; // micro sec, SPEC
    const SAMPLING_TIME = 280; // micro sec, SPEC
    const DELTA_TIME = 40; // micro sec, PULSE_TIME - SAMPLING_TIME, valid for analogReadPin with ZERO runtime
    const CYCLE_TIME = 10000; // micro sec, SPEC 
    const SLEEP_TIME = 9680; // micro sec, SPEC: pulse cycle 10 ms (CYCLE_TIME - PULSE_TIME)     
    const VLED_ON = 1;
    const VLED_OFF = 0;
    let VLED = 0; // digital out PIN
    let VO = 0; // analog in PIN

    /**
         * get dust value (μg/m³) 
         * @param vLED describe parameter here, eg: DigitalPin.P16 (microbit)
         * @param vo describe parameter here, eg: AnalogPin.P1 (microbit)
    */
    //% block
    export function initDustSensor(vled: DigitalPin, vo: AnalogPin) {
        VLED = vled;
        VO = vo;
    }

    //% block
    export function getDustValue(): number {
        let voltage = 0;
        let sum_voltage = 0;
        let dust = 0;
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
            ) * WAVESHARE_DIVIDER;
            sum_voltage += voltage;
        }
        voltage = sum_voltage / SAMPLES;
        dust = (voltage - NODUST_VOLTAGE);
        if (dust < 0) {
            dust = 0
        }
        return Math.round(dust)
    }
}
