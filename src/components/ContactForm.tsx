import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface FormData {
  name: string;
  contact: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Отправка формы...", formData);

      // Формируем сообщение для Telegram
      const message = `🔥 Новая заявка на работу!\n\n👤 Имя: ${formData.name}\n📱 Контакт: ${formData.contact}\n💭 Мотивация: ${formData.message}`;

      console.log("Сообщение для отправки:", message);

      // Отправляем через бота @Elliot_BoBot
      const response = await fetch(
        `https://api.telegram.org/bot7902938475:AAG_s8dYgxKNpL9KX8HSwBhNu8CJqx5P9fs/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: "-1002423648019",
            text: message,
            parse_mode: undefined, // Убираем HTML режим
          }),
        },
      );

      console.log("Статус ответа:", response.status);
      const responseData = await response.json();
      console.log("Ответ API:", responseData);

      if (response.ok && responseData.ok) {
        setIsSuccess(true);
        console.log("Сообщение успешно отправлено!");
      } else {
        throw new Error(
          `Ошибка API: ${responseData.description || "Неизвестная ошибка"}`,
        );
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <Icon
          name="CheckCircle"
          size={64}
          className="mx-auto text-green-500 mb-4"
        />
        <h3 className="text-2xl font-semibold text-foreground mb-2 font-rubik">
          Заявка отправлена!
        </h3>
        <p className="text-muted-foreground font-rubik">
          Мы получили ваше сообщение и скоро свяжемся с вами
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: "", contact: "", message: "" });
          }}
          variant="outline"
          className="mt-6 font-rubik"
        >
          Отправить ещё заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-rubik font-medium">
          Ваше имя
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введите ваше имя"
          required
          className="font-rubik"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="font-rubik font-medium">
          Контакт (телефон или email)
        </Label>
        <Input
          id="contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={handleChange}
          placeholder="+7 (900) 123-45-67 или example@mail.ru"
          required
          className="font-rubik"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-rubik font-medium">
          Почему вы хотите работать у нас?
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Расскажите о своей мотивации и что привлекает вас в нашей компании"
          rows={4}
          required
          className="font-rubik"
        />
      </div>

      <Button
        type="submit"
        className="w-full font-rubik font-medium text-lg py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" size={20} className="animate-spin mr-2" />
            Отправляем...
          </>
        ) : (
          <>
            <Icon name="Send" size={20} className="mr-2" />
            Отправить заявку
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
