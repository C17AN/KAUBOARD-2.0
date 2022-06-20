import axios from "axios";
import { limitToLast, onValue, orderByChild, push, query, ref, remove } from "firebase/database";
import { realtimeDbService, storageService } from "../../firebase/Config";
import { imgBBPhoto, Photo } from "../../types/Photo";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

// TODO: AWS Lambda or Cloud Functions와 연동한 Cronjob 형태로 재작성하기
export const deletePhotoList = async () => {
  const photoUrlRef = query(ref(realtimeDbService, "gallery"), orderByChild("createdAt"));
  onValue(photoUrlRef, (res) => {
    const photoUrlList = Object.entries(res?.val() ?? {});

    photoUrlList?.forEach((photoRef) => {
      const [key, photo] = photoRef as [key: string, photo: Photo];
      if (new Date(photo.expiresAt!).getTime() < new Date().getTime()) {
        remove(ref(realtimeDbService, `gallery/${key}`));
      }
    });
  });
};

export const getPhotoRefList = async () => {
  const promise = new Promise<Photo[]>((resolve, reject) => {
    const photoUrlRef = query(
      ref(realtimeDbService, "gallery"),
      orderByChild("createdAt"),
      limitToLast(100)
    );
    onValue(photoUrlRef, (res) => {
      const photoUrlList: Photo[] = Object.values(res.val() ?? {});
      resolve(photoUrlList);
    });
  });
  return await promise;
};

const dayToSecond = 60 * 60 * 24;

export const postPhotoRef = async (photo: Photo, expiringSecond: string) => {
  const location = ref(realtimeDbService, "gallery");
  const { uploaderEmail, uploaderName, photoUrl, description } = photo;
  const formattedExpiringDate = format(
    new Date(new Date().getTime() + (+expiringSecond! - dayToSecond) * 1000),
    "yyyy-MM-dd:HH:mm:ss"
  );

  if (photoUrl && photoUrl.length > 0) {
    push(location, {
      uid: uuidv4(),
      uploaderEmail,
      uploaderName,
      photoUrl,
      description: description || null,
      createdAt: new Date().getTime(),
      expiresAt: formattedExpiringDate,
    });
  }
};

export const postPhotoOnStorage = async (img) => {
  const imgbbApiEndpoint = "https://api.imgbb.com/1/upload";
  const imgbbApiKey = "dc4f6667e41f113a681cf984930bc32d";
  const formData = new FormData();
  formData.set("key", imgbbApiKey);
  formData.append("image", img);

  const { data } = await axios.post<imgBBPhoto>(imgbbApiEndpoint, formData);
  return data;
};
