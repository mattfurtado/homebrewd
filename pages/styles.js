import React from 'react';
import fetch from 'isomorphic-unfetch';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const res = await fetch(`${baseUrl}/api/styleguide`);
    const styleguide = await res.json();
    return { styleguide };
  }

  render() {
    return (
      <div>
        <h1>BJCP Style Guide</h1>
        <pre>
          <code>{JSON.stringify(this.props.styleguide, null, 2)}</code>
        </pre>
      </div>
    );
  }
}
