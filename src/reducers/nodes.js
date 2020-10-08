import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  GET_NODE_BLOCKS_FAILURE,
  GET_NODE_BLOCKS_SUCCESS,
  GET_NODE_BLOCKS_START,
} from "../constants/actionTypes";
import * as apiStates from "../constants/apiState";
import initialState from "./initialState";

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };

    case GET_NODE_BLOCKS_START:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            blockLoading: apiStates.API_PENDING,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case GET_NODE_BLOCKS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            blockLoading: apiStates.API_SUCCESS,
            blocks: action.res,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case GET_NODE_BLOCKS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            blockLoading: apiStates.API_FAIL,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };

    default:
      return state;
  }
}
