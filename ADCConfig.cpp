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
    uint16_t getVcc() {
	NRF_ADC->EVENTS_END = 0;
  	NRF_ADC->ENABLE = ADC_ENABLE_ENABLE_Enabled;

 	NRF_ADC->EVENTS_END = 0; // Stop any running conversions.
 	NRF_ADC->TASKS_START = 1;

  	while (!NRF_ADC->EVENTS_END) {
  	}
        uint16_t* vcc = (uint8_t*)((NRF_ADC->RESULT * 3 * 1200)/255);
	NRF_ADC->EVENTS_END = 0;
  	NRF_ADC->TASKS_STOP = 1;
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
