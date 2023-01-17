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
    * Read nRF51 Vcc
    */
    //%
    uint8_t getVcc() {
        uint8_t* vcc = (uint8_t*)(NRF_ADC->RESULT);
	return *vcc;
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
	    
	*((uint8_t*)(NRF_ADC_CONFIG)) = *((uint8_t*)(NRF_ADC_CONFIG)) |  
			(ADC_CONFIG_RES_8bit << ADC_CONFIG_RES_Pos) |
+                      (ADC_CONFIG_INPSEL_SupplyOneThirdPrescaling << ADC_CONFIG_INPSEL_Pos) |
+                      (ADC_CONFIG_REFSEL_VBG << ADC_CONFIG_REFSEL_Pos) |
+                      (ADC_CONFIG_PSEL_Disabled << ADC_CONFIG_PSEL_Pos) |
+                      (ADC_CONFIG_EXTREFSEL_None << ADC_CONFIG_EXTREFSEL_Pos);
    }

}
