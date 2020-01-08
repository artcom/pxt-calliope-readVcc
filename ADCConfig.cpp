#include "pxt.h"
#define NRF_ADC_CONFIG 0x40007504

namespace ADCConfig {

    /*
    * Read nRF51 ADC CONFIG REFSEL register
    */
    //%
    uint8_t getREFSEL() {
        uint8_t* adresse = (uint8_t*)(NRF_ADC_CONFIG);
	return *adresse;
    }

    /*
    * Clear nRF51 ADC CONFIG REFSEL register to use internal 1.2 V reference
    */
    //%
    void clearREFSEL() {
	*((uint8_t*)(NRF_ADC_CONFIG)) = *((uint8_t*)(NRF_ADC_CONFIG)) & ~0x60;
    }

    /*
    * Set nRF51 ADC CONFIG REFSEL register to use VDD with prescaling
    */
    //%
    void setREFSEL() {
	*((uint8_t*)(NRF_ADC_CONFIG)) = *((uint8_t*)(NRF_ADC_CONFIG)) | 0x60;
    }

}