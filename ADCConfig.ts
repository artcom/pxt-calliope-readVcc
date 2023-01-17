namespace ADCConfig {
    /**
    * Read nRF51 ADC CONFIG REFSEL register
    */
    //% shim=ADCConfig::getREFSEL
    export function getREFSEL(): uint8 {
	return 0;
    }
	
    export function getVcc(): uint8 {
	return 0;
    }
	
    /*
    * Clear nRF51 ADC CONFIG REFSEL register to use internal 1.2 V reference
    */
    //% shim=ADCConfig::clearREFSEL
    export function clearREFSEL(): void {
	return;
    }

    /*
    * Set nRF51 ADC CONFIG REFSEL register to use VDD reference with prescaling
    */
    //% shim=ADCConfig::setREFSEL
    export function setREFSEL(): void {
	return;
    }    
}
