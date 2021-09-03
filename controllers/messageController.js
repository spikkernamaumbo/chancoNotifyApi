"use strict";

const message_model = require("../models/message.js");
const student = require("../models/student.js");
const staff = require("../models/staff.js");
const department = require("../models/department.js");


/************************ 
 getting all messages
*************************/
exports.getall = async (req, res) => {
  const messages = await message_model.findAll();
  if (messages) {
    res.status(200).json({ messages });
  } else {
    res.status(404).send("no messages");
  }
};

/************************ 
 sending a messages
*************************/

exports.send_message = async (req, res, next) => {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();
  const { title, message_body, is_important } = req.body;
  const staffAvailable = await staff.findByPk(req.id);
  if (staffAvailable) {
    const message_details = Object.assign(req.body, {
      sent_at: time,
      departmentId: staffAvailable.departmentId,
      staffId: staffAvailable.id,
    });
    message_model
      .create(message_details)
      .then((response) => {
        res.status(200).json({
          message: "sent successfully",
          message_description: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
};


/************************ 
 getting broadcast messages
*************************/
exports.get_broadcast_messages = async (req, res, next) => {
  const BroadcastMessages = message_model.findAll({
    where: { message_type: "BROADCAST" },
    attributes: ["message_body", "sent_at", "staffId"],
  });
  BroadcastMessages.then((response) => {
    if (response.length === 0) {
      res.status(200).json({
        status: "No messages currently",
      });
    } else {
      res.status(200).json({
        message: response,
      });
    }
  }).catch((error) => {
    res.status(500).json({
      message: `there has been an error${error.message}`,
    });
  });
};

/************************ 
 getting personal0 messages  not visible in the UI
*************************/
exports.get_personal_messages = async (req, res, next) => {
  const BroadcastMessages = message_model.findAll({
    where: { message_type: "PERSONAL" },
    attributes: ["message_body", "sent_at", "staffId"],
  });
  BroadcastMessages.then((response) => {
    if (response.length === 0) {
      res.status(200).json({
        status: "No messages currently",
      });
    } else {
      res.status(200).json({
        message: response,
      });
    }
  }).catch((error) => {
    res.status(500).json({
      message: `there has been an error${error.message}`,
    });
  });
};

/************************ 
 getting departmentla messages
*************************/
exports.get_department_messages = async (req, res) => {
  const studentAvailable = await student.findOne({
    where: { RegistrationNumber: req.RegistrationNumber },
  });
  if (!studentAvailable)
    return res.status(404).send("hmm there seems to be an error");
  const Msg = await message_model
    .findAll({
      where: { message_type: "DEPARTMENT" },
      attributes: ["message_body", "sent_at"],
      include: {
        model: staff,
        attributes: ["firstName", "lastName", "role", "departmentId"],
        include: { model: department, attributes: ["name", "id"] },
      },
    })
    const idsHolder = [];
  Msg.forEach((message) => {
    const id = message.staff.department.id;
    idsHolder.push(id);
  });
  let messagesId = [];
  idsHolder.forEach((id) => {
    if (studentAvailable.departmentId === id) {
      messagesId.push(id);
    }
  });

  const depId = messagesId.length > 0 ? messagesId[0] : res.status(500).send("there is an error");
  const messages = await message_model
    .findAll({ where: { departmentId: depId } })
    .then((response) => response);
  if (messages.length == 0) {
    res.status(404).json({ messages: "messages not found" });
  } else {
    res.status(200).json({ messages });
  }
};

/************************ 
 getting scolarships messages
*************************/
exports.get_scholarship_messages = async (req, res, next) => {
  const BroadcastMessages = message_model.findAll({
    where: { message_type: "SCHOLARSHIP" },
    attributes: ["message_body", "sent_at", "staffId"],
  });
  BroadcastMessages.then((response) => {
    if (response.length === 0) {
      res.status(200).json({
        status: "No messages currently",
      });
    } else {
      res.status(200).json({
        message: response,
      });
    }
  }).catch((error) => {
    res.status(500).json({
      message: `there has been an error${error.message}`,
    });
  });
};

/************************ 
 getting classroom messages
*************************/
exports.get_classroom_messages = async (req, res, next) => {
  const studentAvailable = await student.findOne({
    where: { RegistrationNumber: req.RegistrationNumber },
  });

  const Msg = await message_model.findAll({
    where: { message_type: "GOOGLE CLASSROOM" },
    attributes: ["message_body", "sent_at", "staffId"],
    include: {
      model: staff,
      attributes: ["firstName", "lastName", "role", "departmentId"],
      include: { model: department, attributes: ["name", "id"] },
    },
  });

  const idsHolder = [];
  Msg.forEach((message) => {
    const id = message.staff.department.id;
    idsHolder.push(id);
  });
  let messagesId = [];
  idsHolder.forEach((id) => {
    if (studentAvailable.departmentId === id) {
      messagesId.push(id);
    }
  });

  const depId = messagesId.length > 0 ? messagesId[0] : "cvbhjkl;'";
  const messages = await message_model
    .findAll({ where: { departmentId: depId } })
    .then((response) => response);

  if (messages.length == 0) {
    res.status(404).json({ messages: "vdfnnmf" });
  } else {
    res.status(200).json({ messages });
  }
};

/************************ 
 getting secretary messages
*************************/

exports.get_secretary_messages = async (req, res, next) => {
  const studentAvailable = await student.findOne({
    where: { RegistrationNumber: req.RegistrationNumber },
  });
  if (!studentAvailable)
    return res.status(404).send("hmm there seems to be an error");

const Msg = await message_model
    .findAll({
      where: { message_type: "SECRETARY" },
      attributes: ["message_body", "sent_at", "staffId"],
      include: {
        model: staff,
        attributes: ["firstName", "lastName", "role", "departmentId"],
        include: { model: department, attributes: ["name", "id"] },
      },
    })
    const idsHolder = [];
    Msg.forEach((message) => {
      const id = message.staff.department.id;
      idsHolder.push(id);
    });
    let messagesId = [];
    idsHolder.forEach((id) => {
      if (studentAvailable.departmentId === id) {
        messagesId.push(id);
      }
    });
  
    const depId = messagesId.length > 0 ? messagesId[0] : res.status(500).send("there is an error");
    const messages = await message_model
      .findAll({ where: { departmentId: depId } })
      .then((response) => response);
    if (messages.length == 0) {
      res.status(404).json({ messages: "vdfnnmf" });
    } else {
      res.status(200).json({ messages });
    }
};

/************************ 
 deleting all messages
*************************/
exports.delete = async (req, res) => {
  message_model
    .destroy({ where: {} })
    .then(() => {
      res.status(200).json("sussessfully deleted all messages");
    })
    .catch((err) => {
      console.error(err);
    });
};

// delete messages after viewing comes here
