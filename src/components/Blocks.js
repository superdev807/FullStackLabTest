import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import * as apiState from "../constants/apiState";
import colors from "../constants/colors";

export const Block = ({ block }) => {
  const classes = useStylesBlock();

  const makeTitle = (blockIndex) => {
    let title = "";
    for (let i = 0; i < 3 - blockIndex.length; ++i) title += "0";
    return title + blockIndex;
  };

  return (
    <div className={classes.block}>
      <p className={classes.blockTitle}>{makeTitle(block.id)}</p>
      {block.attributes.data}
    </div>
  );
};

const Blocks = ({ node }) => {
  const { blockLoading, blocks } = node;
  const classes = useStylesBlocks();

  switch (blockLoading) {
    case apiState.API_PENDING:
      return <Typography>Loading</Typography>;
    case apiState.API_FAIL:
      return <Typography>Fail</Typography>;
    case apiState.API_SUCCESS:
      return (
        <div className={classes.blockSection}>
          {blocks.data &&
            blocks.data.map((block, index) => (
              <Block block={block} key={`block-${index}`} />
            ))}
        </div>
      );
    default:
      return null;
  }
};

Block.propTypes = {
  block: PropTypes.object.isRequired,
};

Blocks.propTypes = {
  node: PropTypes.object.isRequired,
};

const useStylesBlocks = makeStyles(() => ({
  blockSection: {
    width: "100%",
  },
}));

const useStylesBlock = makeStyles(() => ({
  block: {
    backgroundColor: colors.blockBackground,
    color: colors.blockText,
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "5px",
    fontSize: "14px",
    fontFamily: "Roboto",
  },
  blockTitle: {
    color: colors.blockTitle,
    fontSize: "10px",
    margin: "0px",
    padding: "0px",
    marginBottom: "10px",
  },
}));

export default Blocks;
