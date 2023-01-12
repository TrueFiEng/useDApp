/**
 * Links with hashtags to sections (e.g. https://usedapp-docs.netlify.app/docs/api%20reference/hooks/#useetherbalance)
 * Do not properly scroll to linked section, when the page is a MDX.
 * 
 * It only works properly in MD.
 * This is a simple workaround to scroll to a linked section on page load.
 */

module.exports = function (context, options) {
  return {
    name: 'mdx-anchor-scroll',
    injectHtmlTags({content}) {
      return {
        preBodyTags: [
          {
            tagName: 'script',
            attributes: {
              charset: 'utf-8',
              src: '/mdx-anchor-scroll.js',
            },
          },
        ]
      };
    },
  };
};
