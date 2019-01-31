const fs = require('fs');
const path = require('path');
const xmlParser = require('xml2json');

const styleGuideXml = fs.readFileSync(
  path.join(__dirname, '../static', '/bjcp-styleguide.xml')
);
const { styleguide } = xmlParser.toJson(styleGuideXml, { object: true });

const getStyleClass = ({ type }) =>
  styleguide.class.find(cls => cls.type === type);

module.exports = {
  hello: () => 'Hello world',
  styleGuide: () => styleguide,
  styleClass: getStyleClass,
  styleCategory: ({ type, id }) => {
    const styleClass = getStyleClass({ type }) || {};
    const { category = [] } = styleClass;
    return category.find(cat => cat.id === id);
  },
};
