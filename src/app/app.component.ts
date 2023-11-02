import { Component } from '@angular/core';
interface Door {
  selected: boolean;
  open: boolean;
  hasCar: boolean;
  showEmoji: boolean;
  emoji: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  doors: Door[] = [];
  gameStarted = false;
  doorSelected = false;
  gameResult: string = '';
  emojis = ["🚗", "🐐", "🐐"];
  constructor() {
    this.startGame();
  }

  startGame() {
    this.doors = Array.from({length: 3}, (_, i) => ({
      emoji: this.emojis[i],
      selected: false,
      open: false,
      hasCar: false,
      showEmoji: false,
    }));
    const randomIndex = Math.floor(Math.random() * 3);
    this.doors[randomIndex].hasCar = true;
    this.gameStarted = false;
    this.doorSelected = false;
    this.gameResult = '';

    this.gameStarted = true;
    this.shuffleDoors(this.emojis);
  }

  selectDoor(door: Door) {
    if (this.gameStarted && !this.doorSelected) {
      this.doorSelected = true;
      door.selected = true;
      door.showEmoji = false;
      this.revealLosingDoor();
    }
  }

  revealLosingDoor() {
    if (this.gameStarted && this.doorSelected) {
      const unselectedDoors = this.doors.filter((door) => !door.selected && door.emoji !== "🚗");

      if (unselectedDoors.length > 0) {
        const doorToReveal = unselectedDoors[Math.floor(Math.random() * unselectedDoors.length)];
        doorToReveal.open = true;
        doorToReveal.showEmoji = true;
      }
    }
  }

  switchDoors() {
    if (this.gameStarted && this.doorSelected) {
      this.doors.forEach((door) => {
        if (door.selected) {
          door.selected = false;
        } else if (!door.open) {
          door.selected = true;
        }
      });
    }
  }

  determineOutcome() {
    if (this.gameStarted && this.doorSelected) {
      this.doors.forEach((door) => {
        door.showEmoji = true;
      });

      const selectedDoor = this.doors.find((door) => door.selected);
      // @ts-ignore
      if (selectedDoor.emoji === "🚗") {
        this.gameResult = 'Congratulations You Won!😄';
      } else {
        this.gameResult = 'You Lost Try Again😞';
      }
      this.gameStarted = false;
    }
  }

  resetGame() {
    this.startGame();
  }


  shuffleDoors(emojis: string[]) {
    const shuffledEmojis = [...emojis]; // Create a copy of the original emojis array
    for (let i = shuffledEmojis.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [shuffledEmojis[i], shuffledEmojis[j]] = [shuffledEmojis[j], shuffledEmojis[i]];
    }

    // Update the doors with shuffled emojis
    this.doors.forEach((door, index) => {
      door.emoji = shuffledEmojis[index];
    });
  }

}
