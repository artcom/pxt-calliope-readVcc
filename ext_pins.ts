/**
* Extension to the pins module.
*
* @author Raik Andritschke
*/
namespace pins {
    let ADC_initialized = false;

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * Based on 1.2V internal reference Voltage of nRF51 ADC 
     * @param name pin to write to, eg: AnalogPin.P0
     */
    //% blockId="analogReadPinInternalRef" block="analogReadPin based on Internal reference voltage"
    export function analogReadPinInternalRef(name: AnalogPin) {
	if (!ADC_initialized) {
	    // init ADC CONFIG
    	    let dummy = pins.analogReadPin(AnalogPin.P2);
	    ADC_initialized = true;
	}
        // ADC internal 1.2V voltage REF
        ADCConfig.clearREFSEL();
	// read analog value
        let analogvalue = pins.analogReadPin(name);
        // ADC external VDD voltage REF
        ADCConfig.setREFSEL();
	// Internal prescaling
        return (analogvalue * 3);
    }
}