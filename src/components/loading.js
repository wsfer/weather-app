const loading = () =>
  new Range().createContextualFragment(`
    <section class="loading" aria-label="Loading">
      <div class="loading__spin"></div>
    </section>
`);

export default loading;
