let app = new Vue({
  el: "#app",
  data: {
    members: [
      "佐藤",
      "鈴木",
      "高橋",
      "田中",
      "伊藤",
      "渡辺",
      "山本",
      "中村",
      "小林",
      "加藤",
      "吉田",
      "山田",
      "佐々木",
      "山口",
      "松本",
    ],
    random: null,
    bondMembers: [],
    cloneMembers: [],
    week_arr: {},
    holiday: [
      null,
      null,
      null,
      null,
      null,
      null,],
  },
  methods: {

    //メンバーをシャッフルする
    arrayShuffle01: function () {
      for (let i = this.members.length - 1; 0 < i; i--) {
        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        let tmp = this.members[i];
        this.members[i] = this.members[r];
        this.members[r] = tmp;
      }
      return this.members;
    },
    //シャッフル01のクローンを作成
    arrayShuffle02: function () {
      this.cloneMembers = [...this.arrayShuffle01(this.members)];
    },
    shuffleBond: function (i) {
      //シャッフル01とクローンを結合し、6人ずつ分ける
      this.bondMembers = this.arrayShuffle01(this.members).concat(this.cloneMembers);

      this.$set(this.week_arr, 'sliceMembers' + i + '1', this.bondMembers.slice(0, 6));
      this.$set(this.week_arr, 'sliceMembers' + i + '2', this.bondMembers.slice(6, 12));
      this.$set(this.week_arr, 'sliceMembers' + i + '3', [...new Set(this.bondMembers.slice(12, 18))]);
      this.$set(this.week_arr, 'sliceMembers' + i + '4', this.bondMembers.slice(18, 24));
      this.$set(this.week_arr, 'sliceMembers' + i + '5', this.bondMembers.slice(24, 30));

      //重複したら、シャッフルし直す
      for (let j = 0; j < 4; j++) {
        if (i === j) {
          if (this.week_arr['sliceMembers' + j + '3'].length === 6) {
            return;
          } else {
            this.arrayShuffle01();
            this.arrayShuffle02();
            this.shuffleBond(i);
          }
        };
      }
    },
    //ボタンクリックしたら動く関数
    btnClick: function () {
      for (let i = 0; i < 4; i++) {
        this.arrayShuffle01();
        this.arrayShuffle02();
        this.shuffleBond(i);
      };
    },
  },
});
