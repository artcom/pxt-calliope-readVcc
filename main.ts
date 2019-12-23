/**
 * Benutzerdefinierte Blöcke
 */
//% weight=100 color=#0fbc11 icon=""
namespace sharpGP2Y1010AU0F {
    const REFERENCE_VOLTAGE = 3;

/**
     * get dust value (μg/m³) 
     * @param vLED describe parameter here, eg: DigitalPin.P16 (microbit)
     * @param vo describe parameter here, eg: AnalogPin.P1 (microbit)
*/
//% block
    export function getDustValue(vLED: DigitalPin, vo: AnalogPin): number {
        let voltage = 0;
        let dust = 0;
        pins.digitalWritePin(vLED, 0);
        control.waitMicros(160);
        voltage = pins.analogReadPin(vo);
        control.waitMicros(100);
        pins.digitalWritePin(vLED, 1);
        voltage = pins.map(
            voltage,
            0,
            1023,
            0,
            REFERENCE_VOLTAGE / 2 * 3
        );
        dust = (voltage - 380) * 5 / 29;
        if (dust < 0) {
            dust = 0
        }
        return Math.round(dust)
    }
}
