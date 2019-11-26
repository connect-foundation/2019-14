class TestStore {
  constructor(reducer, state = {}) {
    this.state = state;
    this.reducer = reducer;
  }

  setState(state) {
    this.state = state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    return this.state;
  }

  async dispatchAsync(action) {
    this.state = await this.reducer(this.state, action);
    return this.state;
  }
}

export default TestStore;
