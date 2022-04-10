import { Schema, model } from 'mongoose';

const cookSchema = new Schema(
  {
    uuid: { type: String, required: true, trim: true },
    userid: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

cookSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

cookSchema.static('setCookie', function (args) {
  console.log(args.userid);
  return this.findOneAndUpdate(
    { userid: args.userid },
    { uuid: args.uuid, userid: args.userid },
    { upsert: true },
    function (err, res) {
      if (err) {
        console.log(err);
      }
    }
  );
});

const Cookie = model('cookie', cookSchema);

export default Cookie;
