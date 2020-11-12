import React from 'react';
// Import icons
import { HeartIcon, FlameIcon, TrashcanIcon } from "@primer/octicons-react";
import { AiOutlineMeh as MehIcon } from "react-icons/ai";
import { HiTrendingDown as NotStonksIcon } from "react-icons/hi";

// Reaction Picker functional component;
var ReactionPicker = (props) => {
  return (
    <div className={`reactions ${props.reactionPickerActive ? "active" : ""}`}>
      <div onClick={() => { props.react("flame"); }}>
        <FlameIcon />
      </div>

      <div onClick={() => { props.react("trash"); }}>
        <TrashcanIcon />
      </div>

      <div style={{ padding: "6px" }}
        onClick={() => { props.react("meh"); }}>
        <MehIcon size={20} />
      </div>

      <div onClick={() => { props.react("heart"); }}>
        <HeartIcon />
      </div>

      <div style={{ padding: "7px" }}
        onClick={() => { props.react("notstonks"); }}>
        <NotStonksIcon size={18} />
      </div>
    </div>
  );
};

// Return an icon based on reaction type.
var returnReaction = (reaction) => {
  switch (reaction) {
    case "flame":
      return <FlameIcon size={16} />;
    case "trash":
      return <TrashcanIcon />;
    case "meh":
      return <MehIcon />;
    case "heart":
      return <HeartIcon />;
    case "notstonks":
      return <NotStonksIcon />;
    default:
      break;
  }
};

// Get a count of # of a specific reaction on a post.
var reactionCount = (postReactions, reaction) => {
  let rc = 0;
  for (var currReaction of postReactions)
    if (currReaction === reaction) rc++;
  return rc;
};

// Create slimmed down list of post's reactions to just 1 entry per type.
var slimReactions = (reactions) => {
    if (reactions === undefined) return;
    
    let sl = [];
    reactions.forEach((reaction) => {
        if (!sl.includes(reaction)) sl.push(reaction);
    });
    return sl;
};  

module.exports = { ReactionPicker, returnReaction, reactionCount, slimReactions };
