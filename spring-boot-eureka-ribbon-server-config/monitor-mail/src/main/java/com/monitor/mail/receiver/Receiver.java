package com.monitor.mail.receiver;

import com.monitor.mail.domain.RegisteredUser;
import com.monitor.mail.service.MailService;
import com.monitor.utils.JsonMapperUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Receiver {

    private static final String MAIL_SUBJECT = "Welcome test!";
    private static final String MAIL_CONTENT = "Thanks register!";

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    private MailService mailService;

    @Value("${mail.from}")
    private String from;

    @RabbitListener(queues = "monitor.async.process.queue")
    public void receiveMessage(Message message) {
        LOG.info(String.format("Received message <%s>", new String(message.getBody())));

        final RegisteredUser user = JsonMapperUtil.nonDefaultMapper().fromJson(new String(message.getBody()), RegisteredUser.class);
        try {
            mailService.sendMail(user.getEmail(), from, MAIL_SUBJECT, MAIL_CONTENT);
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }
}
