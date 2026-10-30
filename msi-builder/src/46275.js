Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfernoEffectHost = {
  lockCount: 0,
  lock: function () {
    this.lockCount++;
  },
  callbacks: [],
  callEffects: function () {
    this.lockCount--;
    if (this.lockCount < 0) {
      throw new Error("Unexpected Effect Call");
    }
    if (this.lockCount === 0) {
      var e = this.callbacks;
      this.callbacks = [];
      e.forEach(function (e) {
        return e();
      });
    }
  }
};