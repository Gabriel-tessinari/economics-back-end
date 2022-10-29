import { randNumber, randSoonDate, randWord } from "@ngneat/falso";

export class FakeDataGenerator {
  static genString(): string {
    return randWord();
  }

  static genNumber(decimals: number): number {
    return randNumber({ fraction: decimals });
  }

  static genDateString() {
    let date = randSoonDate();
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  static genListIndex(length: number): number {
    return randNumber({ min: 0, max: length - 1 });
  }
}
