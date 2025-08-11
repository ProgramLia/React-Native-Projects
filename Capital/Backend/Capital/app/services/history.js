const History = require("../api/v1/models/history");
const { NotFound } = require("../errors/notFound");

async function getOneHistory(req) {
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 5;
     const type = req.query.type;
     const condition = {};
     if (type) condition.type = type;
     const user_id = req.user._id;
     condition.user_id = user_id; // ✅ Filter berdasarkan user yang login
     const skip = (page - 1) * limit;
     const total = await History.countDocuments(condition);
     const history = await History.find(condition)
         .skip(skip)
         .limit(limit)
         .sort({ createdAt: -1 });
     return { history, total, limit, page, skip };
}

async function getAllHistory(req) {
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 50;
     const type = req.query.type?.toLowerCase(); // contoh: "topup", "transfer"
     const keyword = req.query.keyword?.trim();

     const condition = {};

     // Filter berdasarkan type jika ada
     if (type) {
          condition.type = type;
     }

     // Filter berdasarkan keyword jika ada
     if (keyword) {
          condition.$or = [
               { type: { $regex: keyword, $options: "i" } },
               { description: { $regex: keyword, $options: "i" } },
               { amount: isNaN(keyword) ? undefined : Number(keyword) }  // Jika keyword berupa angka
          ].filter(Boolean); // hapus undefined dari pencarian
     }

     const skip = (page - 1) * limit;
     const total = await History.countDocuments(condition);

     const history = await History.find(condition)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });

     return { history, total, limit, page, skip };
}


async function getDetailHistory(req) {
     const _id = req.params._id;
     const history = await History.findById(_id);
     if(!history) throw new NotFound("History not found");
     return history;
}

async function deleteHistory(req) {
     const _id = req.params._id;

     // Cari dulu datanya
     const history = await History.findById(_id);
     if (!history) throw new NotFound("History not found");

     // Lakukan penghapusan
     await History.deleteOne({ _id });

     return { message: "History successfully deleted." };
}

module.exports = {getAllHistory, getOneHistory, getDetailHistory, deleteHistory };
