using CarNS;

namespace CarTests
{
    [TestClass]
    public class CarTests
    {
        [TestMethod]
        public void Get_Start_Values()
        {
            // Arrange
            Car car = new Car();

            // Action

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Gear should be 0 when starting");
            Assert.AreEqual(0, car.GetSpeed(), "Speed should be 0 when starting");
            Assert.IsFalse(car.IsTurnedOn(), "Engine should be off when starting");
            Assert.AreEqual(Direction.IMMOBILE, car.GetDirection(), "Direction should be IMMOBILE when starting");
        }

        [TestMethod]
        public void Switching_Engine_On_When_Engine_Is_Off()
        {
            // Arrange
            Car car = new Car();

            // Action
            car.TurnOnEngine();

            // Assert
            Assert.IsTrue(car.IsTurnedOn(), "Engine should be on after turning it on");
        }

        [TestMethod]
        public void Switching_Engine_On_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.TurnOnEngine();

            // Assert
            Assert.IsTrue(car.IsTurnedOn(), "Engine should remain on when trying to turn on an already running engine");
        }

        [TestMethod]
        public void Switching_Engine_Off_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.TurnOffEngine();

            // Assert
            Assert.IsFalse(car.IsTurnedOn(), "Engine should be off after turning it off");
        }

        [TestMethod]
        public void Switching_Engine_Off_When_Engine_Is_On_And_Gear_Is_Not_Neutral()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(1);

            // Action
            car.TurnOffEngine();

            // Assert
            Assert.IsTrue(car.IsTurnedOn(), "Engine should not turn off when gear is not in neutral");
        }

        [TestMethod]
        public void Switching_Engine_Off_When_Engine_Is_On_And_Speed_Is_Not_Zero_And_Gear_Is_Not_Neutral()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(1);
            car.SetSpeed(20);

            // Action
            car.TurnOffEngine();

            // Assert
            Assert.IsTrue(car.IsTurnedOn(), "Engine should not turn off when speed is not zero and gear is not in neutral");
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_Is_Off()
        {
            // Arrange
            Car car = new Car();

            // Action
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Gear should not change to reverse when engine is off");
        }

        [TestMethod]
        public void Set_Gear_1_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.SetGear(1);

            // Assert
            Assert.AreEqual(1, car.GetGear(), "Gear should be 1 after setting it when engine is on");
        }

        [TestMethod]
        public void Set_Gear_2_When_Engine_Is_On_And_Speed_Is_Not_In_Interval_Of_2_Gear()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.SetGear(2);

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Gear should not change to 2 when speed is not within the acceptable range for gear 2");
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_Is_On_And_Speed_Is_Zero()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(-1, car.GetGear(), "Gear should be reverse after setting it when engine is on and speed is zero");
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_Is_Off_And_Speed_Is_Not_Zero()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(-1);
            car.SetSpeed(20);
            car.SetGear(0);
            // Action
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Gear should not change to reverse when speed is not zero");
        }


        [TestMethod]
        public void Set_Gear_1_From_R_Gear_When_Engine_Is_On_And_Speed_Is_Not_Zero()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(-1);
            car.SetSpeed(20);

            // Action
            car.SetGear(1);

            // Assert
            Assert.AreEqual(-1, car.GetGear(), "Gear should not change from reverse to 1 when speed is not zero");
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_Is_On_Speed_Zero_And_Gear_Already_R()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(-1);
            // Action
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(-1, car.GetGear(), "Gear should remain reverse when already set to reverse and speed is zero");
        }

        [TestMethod]
        public void Set_Speed_When_Engine_Is_Off()
        {
            // Arrange
            Car car = new Car();

            // Action
            car.SetSpeed(20);

            // Assert
            Assert.AreEqual(0, car.GetSpeed(), "Speed should not change when engine is off");
        }

        [TestMethod]
        public void Set_Speed_When_Engine_Is_On_With_Zero_Gear()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.SetSpeed(20);

            // Assert
            Assert.AreEqual(0, car.GetSpeed(), "Speed should not increase when engine is on and gear is neutral");
        }

        [TestMethod]
        public void Set_Speed_Which_In_Interval_Of_1_Gear_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(1);

            // Action
            car.SetSpeed(20);

            // Assert
            Assert.AreEqual(20, car.GetSpeed(), "Speed should be 20 when set within the interval of gear 1");
            Assert.AreEqual(Direction.FORWARD, car.GetDirection(), "Direction should be FORWARD when speed is set to 20 in gear 1");
        }

        [TestMethod]
        public void Set_Speed_Which_Is_More_Than_Interval_Of_1_Gear_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(1);

            // Action
            car.SetSpeed(60);

            // Assert
            Assert.AreEqual(0, car.GetSpeed(), "Speed should not change when set above the interval of gear 1");
        }

        [TestMethod]
        public void Set_Speed_Which_Is_Less_Than_Interval_Of_1_Gear_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(1);

            // Action
            car.SetSpeed(-10);

            // Assert
            Assert.AreEqual(0, car.GetSpeed(), "Speed should not change when set below the interval of gear 1");
            Assert.AreEqual(Direction.IMMOBILE, car.GetDirection(), "Direction should be IMMOBILE when speed is set below the interval of gear 1");
        }

        [TestMethod]
        public void Set_Speed_Which_In_Interval_Of_R_Gear_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(-1);

            // Action
            car.SetSpeed(10);

            // Assert
            Assert.AreEqual(-10, car.GetSpeed(), "Speed should be -10 when set within the interval of reverse gear");
            Assert.AreEqual(Direction.BACKWARD, car.GetDirection(), "Direction should be BACKWARD when speed is set within the interval of reverse gear");
        }

        [TestMethod]
        public void Set_Speed_Which_In_Interval_Of_N_Gear_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Action
            car.SetSpeed(0);

            // Assert
            Assert.AreEqual(0, car.GetSpeed(), "Speed should be 0 when set to 0 with engine on");
        }

        [TestMethod]
        public void Set_Gear_With_Invalid_Gear_Should_Return_False()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            int invalidGear = 10;

            // Act
            bool result = car.SetGear(invalidGear);

            // Assert
            Assert.IsFalse(result, "SetGear should return false for a gear not present in the gearSpeedRange dictionary.");
        }

        [TestMethod]
        public void Set_Speed_Less_Than_Zero_Should_Return_False()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();

            // Act
            bool result = car.SetSpeed(-1);

            // Assert
            Assert.IsFalse(result, "Setting speed less than zero should return false.");
        }

        [TestMethod]
        public void Set_Speed_Reverse_Gear_Out_Of_Range_Should_Return_False()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(-1);

            // Act
            bool result = car.SetSpeed(30);

            // Assert
            Assert.IsFalse(result, "Setting speed to 30 on reverse gear should return false.");
        }

        [TestMethod]
        public void Set_Speed_Invalid_Gear_Should_Return_False()
        {
            // Arrange
            Car car = new Car();
            car.TurnOnEngine();
            car.SetGear(6);

            // Act
            bool result = car.SetSpeed(10);

            // Assert
            Assert.IsFalse(result, "Setting speed on an invalid gear should return false.");
        }


    }
}
