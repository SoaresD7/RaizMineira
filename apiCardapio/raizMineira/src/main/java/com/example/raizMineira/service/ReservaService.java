package com.example.raizMineira.service;

import com.example.raizMineira.model.Reserva;
import com.example.raizMineira.model.Mesa;
import com.example.raizMineira.repository.MesaRepository;
import com.example.raizMineira.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.time.DayOfWeek;
import java.util.List;

@Service
public class ReservaService {
    @Autowired private ReservaRepository reservaRepo;
    @Autowired private MesaRepository   mesaRepo;

    public Reserva criar(Reserva r) {
        DayOfWeek dow = r.getDataReserva().getDayOfWeek();
        int hora = r.getDataReserva().getHour();
        boolean ok = (dow == DayOfWeek.SUNDAY)
            ? (hora >= 13 && hora < 23)
            : (hora >= 13 && hora <= 23);
        if (!ok) throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "Fora do horário de funcionamento"
        );

        Mesa mesa = mesaRepo.findById(r.getMesa().getId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Mesa inválida"
            ));

        if (reservaRepo.existsByMesaAndDataReserva(mesa, r.getDataReserva())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Mesa ocupada neste horário"
            );
        }

        r.setMesa(mesa);
        return reservaRepo.save(r);
    }

    public List<Reserva> listarCpf(String cpf) {
        return reservaRepo.findByCpf(cpf);
    }

    public Reserva buscarId(Integer id) {
        return reservaRepo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Reserva não encontrada"
            ));
    }

    public void cancelar(Integer id) {
        buscarId(id);
        reservaRepo.deleteById(id);
    }
}
