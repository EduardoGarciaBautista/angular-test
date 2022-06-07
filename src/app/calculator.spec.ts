import {Calculator} from './calculator';
// add f to focus a test
describe('Calculator component', () => {

  describe('test for multiply', () => {
    it('should return 100', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(10, 10);
      // Assert
      expect(rta).toEqual(100);
    });

    it('should return 4', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(2, 2);
      // Assert
      expect(rta).toEqual(4);
    });
  });

  describe('test for divide', () => {
    it('should return 2.5', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.divide(5, 2);
      const rta2 = calculator.divide(1, 1);
      // Assert
      expect(rta).toEqual(2.5);
      expect(rta2).toEqual(1);
    });

    it('should return null', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.divide(3, 0);
      // Assert
      expect(rta).toBeNull();
    });

    it('test matchers', function() {
      const name = 'Eduardo';
      let name2;

      expect(name).toBeDefined();
      expect(name2).toBeUndefined();
      expect(1 + 3).toEqual(4);
      expect(1 + 3 === 4).toBeTruthy();
    });
  });
});
