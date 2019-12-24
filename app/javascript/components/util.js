function getTaskParams(task) {
  var params = "";
  if (task.hasOwnProperty("description"))
    params += "task[description]=" + task["description"];
  if (task.hasOwnProperty("isDone"))
    params += (params ? "&" : "") + "task[isDone]=" + task["isDone"];
  if (task.hasOwnProperty("tags"))
    params +=
      (params ? "&" : "") +
      (task["tags"].length
        ? task["tags"].map(tag => "task[tag_ids][]=" + tag.id).join("&")
        : "task[tag_ids][]");
  return "?".concat(params);
}

export default getTaskParams;
