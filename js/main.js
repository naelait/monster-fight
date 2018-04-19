new Vue({
  el: "#app",
  data: {
    yourHp: 100,
    monsterHp: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    start: function() {
      this.gameIsRunning = true;
      this.yourHp = 100;
      this.monsterHp = 100;
      this.turns = [];
    },
    calculateDamage: function(max, min) {
      return Math.floor(Math.random() * max) + min;
    },
    monsterAttack: function(){
      var damage = this.calculateDamage(10, 1);
      this.yourHp -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `The monster did ${damage} damages !!`
      })
    },
    playerAttack: function(){
      var damage = this.calculateDamage(6, 1);
      this.monsterHp -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `The player did ${damage} damages !!`
      })
    },
    attack: function(){
      this.playerAttack();
      this.monsterAttack();
    },
    specialAttack: function() {
      this.monsterHp -= this.calculateDamage(12, 5);
      this.yourHp -= this.calculateDamage(15, 7);
    },
    heal: function() {
      this.yourHp -= this.calculateDamage(10, 3);
      this.yourHp += 10;
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.monsterHp = 100;
      this.yourHp = 100;
      this.turns = [];
    }
  },
  watch: {
    yourHp: function() {
      if (this.yourHp >= 100) {
        this.yourHp = 100;
      }
      if (this.yourHp < 0) {
        this.yourHp = 0;
      } else if (this.yourHp == 0) {
        if (confirm("You lost ! New Game?")) {
          this.start();
        } else {
          this.gameIsRunning = false;
        }
      }
    },
    monsterHp: function() {
      if (this.monsterHp < 0) {
        this.monsterHp = 0;
      } else if (this.monsterHp == 0) {
        if (confirm("You won ! New Game?")) {
          this.start();
        } else {
          this.gameIsRunning = false;
        }
      }
    }
  }
});
