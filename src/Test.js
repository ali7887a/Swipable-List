import React, { useEffect, useState } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import {
  ActionContent,
  Avatar,
  ItemColumn,
  ItemColumnCentered,
  ItemContent,
  ItemInfoLine,
  ItemNameLine,
  ItemRow,
} from "./styledComponents";
import "./TwoAction.css";
import { useDispatch, useSelector } from "react-redux";
import { ActionGetApi } from "./action";

const WithTwoActions = () => {
    //all the state that we want
  const [people, setPeople] = useState();
  const [fullSwipe, setFullSwipe] = useState(false);
  const [threshold, setThreshold] = useState(0.5);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipeAction, setSwipeAction] = useState();
  const [triggeredItemAction, setTriggeredItemAction] = useState("None");
  // get data from an API
  const dispatch = useDispatch();
  const { OneOrders } = useSelector((e) => e.OneOrder);
  useEffect(() => {
    dispatch(ActionGetApi());
  }, [dispatch]);
  const arr = Array.from(Array(OneOrders && OneOrders.data.length).keys());
//   the main array of object that we want
  var newObj = OneOrders&&OneOrders.data.map((item, i)=>({...item, Number: arr[i]}));
  const handleSwipeStart = () => {
    setSwipeAction("Swipe started");
    setTriggeredItemAction("None");
  };

  const handleSwipeEnd = () => {
    setSwipeAction("Swipe ended");
    setSwipeProgress();
  };

  const handleAccept = (id) => () => {
    console.log("[Handle ACCEPT]", id);
    setTriggeredItemAction(`[Handle ACCEPT] - ${id}`);
  };

  const handleDelete = (id) => () => {
    console.log("[Handle DELETE]", id);
    setTriggeredItemAction(`[Handle DELETE] - ${id}`);
    setPeople(people.filter((person) => person.id !== id));
  };

  const handleWaitlist = (id) => () => {
    console.log("[Handle WAITLIST]", id);
    setTriggeredItemAction(`[Handle WAITLIST] - ${id}`);
  };

  const handleReject = (id) => () => {
    console.log("[Handle REJECT]", id);
    setTriggeredItemAction(`[Handle REJECT] - ${id}`);
  };
  const leadingActions = ({ id }) => (
    <LeadingActions>
      <SwipeAction onClick={handleAccept(id)}>
        <ActionContent style={{ backgroundColor: "gray" }}>
          Alarm
        </ActionContent>
      </SwipeAction>
      <SwipeAction onClick={handleWaitlist(id)}>
        <ActionContent style={{ backgroundColor: "gray" }}>
          checked
        </ActionContent>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction onClick={handleReject(id)}>
        <ActionContent style={{ backgroundColor: "green" }}>
          Edit
        </ActionContent>
      </SwipeAction>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <ActionContent style={{ backgroundColor: "red" }}>
          <ItemColumnCentered>Delete</ItemColumnCentered>
        </ActionContent>
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <div className="basic-swipeable-list__container">
      <SwipeableList
        fullSwipe={fullSwipe}
        style={{ backgroundColor: "#555878" }}
        type={ListType.IOS}
      >
        {newObj&&newObj.map(({ name , _id , Number }) => (
          <SwipeableListItem
            key={_id}
            leadingActions={leadingActions({ _id })}
            trailingActions={trailingActions({ _id })}
            onSwipeEnd={handleSwipeEnd}
            onSwipeProgress={setSwipeProgress}
            onSwipeStart={handleSwipeStart}
          >
            <ItemContent>
              <ItemRow>
                <ItemColumn>
                  <ItemNameLine>{Number+1}. {""}{name}</ItemNameLine>
                </ItemColumn>
              </ItemRow>
            </ItemContent>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default WithTwoActions;
