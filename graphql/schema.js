const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type StyleSubcategoryStat {
    flexible: Boolean!
    low: Float!
    high: Float!
  }

  type StyleSubcategoryStats {
    ibu: StyleSubcategoryStat
    og: StyleSubcategoryStat
    fg: StyleSubcategoryStat
    srm: StyleSubcategoryStat
    abv: StyleSubcategoryStat
  }

  type StyleSubcategory {
    id: String!
    name: String!
    aroma: String
    appearance: String
    flavor: String
    mouthfeel: String
    impression: String
    comments: String
    history: String
    ingredients: String
    comparison: String
    examples: String
    tags: [String]
    stats: StyleSubcategoryStats
  }

  type StyleCategory {
    id: String!
    name: String!
    notes: String
    subcategory: [StyleSubcategory]!
  }

  type StyleClass {
    type: String!
    category: [StyleCategory]!
  }

  type StyleGuide {
    class: [StyleClass]!
  }

  type Query {
    hello: String
    styleGuide: StyleGuide
    styleClass(type: String!): StyleClass
    styleCategory(type: String!, id: String!): StyleCategory
  }
`);
