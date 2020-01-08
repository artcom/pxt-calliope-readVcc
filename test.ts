// tests go here; this will not be compiled when this package is used as a library
let Register = 0
let Voltage = 0
while (true) {
    Register = ADCConfig.getREFSEL();
    //basic.showNumber(Register)
    Voltage = (pins.analogReadPin(AnalogPin.P1) * 3.25) / 1023
    basic.showNumber(Voltage)
    Register = ADCConfig.getREFSEL();
    //basic.showNumber(Register)
    ADCConfig.clearREFSEL();
    Register = ADCConfig.getREFSEL();
    //basic.showNumber(Register)
    Voltage = (pins.analogReadPin(AnalogPin.P1) * 1.2 * 3) / 1023
    basic.showNumber(Voltage)
    Register = ADCConfig.getREFSEL();
    //basic.showNumber(Register)
    ADCConfig.setREFSEL();
    Register = ADCConfig.getREFSEL();
    //basic.showNumber(Register)
    basic.pause(1000);
}